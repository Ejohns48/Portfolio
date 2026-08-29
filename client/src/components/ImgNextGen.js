import React, { memo } from 'react';

const ImgNextGen = memo(({
  id,
  srcWebp,
  srcJxr,
  srcJp2,
  fallback,
  alt,
  loading = "lazy",
  decoding = "async",
  ...props
}) => {
  return (
    <picture>
       <source srcSet={srcWebp} type="image/webp" />
       <source srcSet={srcJxr} type="image/jxr" />
       <source srcSet={srcJp2} type="image/jp2" />
       <source srcSet={fallback} type="image/jpeg" />
       <img 
         id={id} 
         src={fallback} 
         alt={alt} 
         loading={loading}
         decoding={decoding}
         {...props} 
       />
    </picture>
  );
});

ImgNextGen.displayName = 'ImgNextGen';

export default ImgNextGen;