#!/bin/bash

# Directory containing videos
VIDEO_DIR="../videos"
# Directory for storing storybooks
STORYBOOK_DIR="../storybooks"

# Create storybook directory if it doesn't exist
mkdir -p "$STORYBOOK_DIR"

# Process each video file
for video in "$VIDEO_DIR"/*.mp4; do
    # Get just the filename without extension
    filename=$(basename "$video" .mp4)
    
    # Create a directory for this video's storybook
    mkdir -p "$STORYBOOK_DIR/$filename"
    
    # Extract keyframes at scene changes and regular intervals
    ffmpeg -i "$video" -vf "select=gt(scene\,0.3)+eq(mod(n\,300)\,0)" -vsync vfr "$STORYBOOK_DIR/$filename/frame_%04d.jpg"
    
    # Create a text file with video metadata
    ffmpeg -i "$video" 2>&1 | grep -E 'Duration|Stream' > "$STORYBOOK_DIR/$filename/metadata.txt"
    
    # Create a PDF with the extracted frames (requires ImageMagick)
    # convert "$STORYBOOK_DIR/$filename/frame_*.jpg" "$STORYBOOK_DIR/$filename/storybook.pdf"
    
    echo "Created storybook for $filename"
done
