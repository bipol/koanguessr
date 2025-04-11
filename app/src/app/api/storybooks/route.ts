import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Define koans that match the actual storyboard content
const koans = [
  {
    id: 'short640x360-ending-with-black-frames',
    koan: `A garden listens while green spheres grow,
The pink vessel waits, but nectar does not flow.
What sound does sunlight make
When captured by leaves that do not speak?
The microphone hears what the gardener cannot.`
  },
  {
    id: 'short640x360',
    koan: `The frame holds memories not yet forgotten.
Two young trees grow beside the old trunk.
A message in blue speaks of what hides behind cloth.
What gift can be given that was never possessed?
In darkness, white words celebrate what cannot be seen.`
  },
  {
    id: 'rotated_video_storyboard',
    koan: `One mouth speaks, yet six selves appear.
Each identical, yet none the same.
The words flow forward while the speaker remains still.
What is said when nothing changes?
Between the frames, truth hides in plain sight.`
  },
  {
    id: 'rotated-90',
    koan: `In the sideways garden, the sage neither falls nor rises.
Gravity bends to wisdom, not wisdom to gravity.
When East becomes South, and North becomes West,
The lotus still opens, unconcerned with direction.
What is correct orientation when the path itself turns?
One who sees clearly needs no level ground.`
  },
  {
    id: 'rotated-180',
    koan: `The lotus that blooms upside-down,
Still offers its petals to an inverted sky.
When up becomes down, and down becomes up,
Is the student preparing, or is preparation studying the student?
Words read backward reveal the same truth.
The master stands on his head to see the world right-side up.`
  },
  {
    id: 'old_bee_v',
    koan: `Numbers glow green while winter weeps,
The flower of industry blooms even as snow falls.
Three digits announce suffering,
Seven digits announce truth.
What is the cost of warmth when the world itself grows cold?
The machine says "COLD" but does not feel the chill.`
  },
  {
    id: 'hdr-video',
    koan: `A garden listens while green spheres grow,
The pink vessel waits, but nectar does not flow.
What sound does sunlight make
When captured by leaves that do not speak?
The microphone hears what the gardener cannot.`
  }
];

export async function GET() {
  try {
    // Use the correct path to the public directory
    const storybooksDir = path.join(process.cwd(), 'public', 'storybooks');
    console.log('Looking for storybooks in:', storybooksDir);
    
    if (!fs.existsSync(storybooksDir)) {
      console.error('Storybooks directory does not exist:', storybooksDir);
      return NextResponse.json({ error: 'Storybooks directory not found' }, { status: 404 });
    }

    const directories = fs.readdirSync(storybooksDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    console.log('Found directories:', directories);

    const storybooks = directories.map(dir => {
      const framesDir = path.join(storybooksDir, dir);
      const frames = fs.readdirSync(framesDir)
        .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file))
        .map(file => `/storybooks/${dir}/${file}`);

      console.log(`Found ${frames.length} frames for ${dir}`);

      const matchingKoan = koans.find(k => k.id === dir);
      return {
        id: dir,
        name: dir,
        frames,
        koan: matchingKoan ? matchingKoan.koan : 'A moment captured in time, yet always changing.'
      };
    });

    return NextResponse.json({ storybooks });
  } catch (error) {
    console.error('Error reading storybooks:', error);
    return NextResponse.json({ error: 'Failed to read storybooks' }, { status: 500 });
  }
} 