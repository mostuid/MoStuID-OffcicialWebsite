const fs = require('fs');

const homeFile = 'd:/MoStu.id/OUR WEBSITE/MoStuID-OffcicialWeb/src/pages/Home.jsx';
let content = fs.readFileSync(homeFile, 'utf8');

// Fix the root wrapper to remove any bottom padding
content = content.replace(
  'className="relative w-full min-h-0 md:min-h-screen flex flex-col pb-8 md:pb-0 pt-20 md:pt-0"',
  'className="relative w-full min-h-0 md:min-h-screen flex flex-col"'
);

// Fix the flex container padding top (pt-32 is usually 8rem = 128px, navbar is usually ~80px, should be enough)
content = content.replace(
  'pt-32 md:pt-32 px-4 md:px-[3%] gap-4 md:gap-2 pb-0"',
  'pt-28 sm:pt-32 md:pt-32 px-4 md:px-[3%] gap-4 md:gap-2 pb-0"'
);

// If the image is not touching the bottom, it might be because the image container has `bottom: 0` but its height is 100%.
// We should make sure `photoMinHeight` is reasonable and there's no margin below it.
// The image container is `w-full flex-1 min-h-0 md:basis-[42%] md:shrink-0 flex justify-center md:justify-end items-end`

fs.writeFileSync(homeFile, content);
console.log('Fixed Home padding');
