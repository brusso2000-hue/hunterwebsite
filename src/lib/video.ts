import { SITE } from './site';

// "How brush plating works" explainer. Replace the files in public/video/ to update it.
export const HOW_IT_WORKS_VIDEO = {
  src: '/video/brush-plating-how-it-works.mp4',
  webm: '/video/brush-plating-how-it-works.webm',
  poster: '/video/brush-plating-how-it-works.jpg',
  width: 1280,
  height: 720,
  title: 'How the Micro-Metallizer gold plating pen works',
  description:
    'Brush plating step by step: clamp the part, prep the surface, connect the power supply, then brush gold onto PCB edge contacts with a Micro-Metallizer plating pen.',
  duration: 'PT35S',
  uploadDate: '2026-10-21',
};

export const videoSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: HOW_IT_WORKS_VIDEO.title,
  description: HOW_IT_WORKS_VIDEO.description,
  thumbnailUrl: [`${SITE.origin}${HOW_IT_WORKS_VIDEO.poster}`],
  contentUrl: `${SITE.origin}${HOW_IT_WORKS_VIDEO.src}`,
  uploadDate: HOW_IT_WORKS_VIDEO.uploadDate,
  duration: HOW_IT_WORKS_VIDEO.duration,
  publisher: { '@type': 'Organization', name: SITE.name, url: SITE.origin },
});
