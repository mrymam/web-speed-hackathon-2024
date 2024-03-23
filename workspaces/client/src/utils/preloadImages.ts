import path from 'path-browserify';

async function wait(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export async function preloadImages(images: string[]|undefined) {
  if (images == undefined || images.length == 0) {
    return
  }  
  const imagePathList: string[] = images.filter((imagePath) => {
    const extension = path.parse(imagePath).ext.toLowerCase();
    return ['.bmp', '.jpg', '.jpeg', '.gif', '.png', '.webp', '.avif'].includes(extension);
  });

  const prefetch = Promise.all(
    imagePathList.map((imagePath) => {
      return new Promise((resolve) => {
        const link = document.createElement('link');

        Object.assign(link, {
          as: 'image',
          crossOrigin: 'anonymous',
          fetchPriority: 'high',
          href: imagePath,
          onerror: resolve,
          onload: resolve,
          rel: 'preload',
        });
        document.head.appendChild(link);
      });
    }),
  );

  await Promise.race([prefetch, wait(5000)]);
}
