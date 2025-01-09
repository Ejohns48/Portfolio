import React from 'react';

const ImgNextGen = ({
  id,
  srcWebp,
  srcJxr,
  srcJp2,
  fallback,
  alt,
  ...props
}) => {
  return (
    <picture>
       <source srcSet={srcWebp} type="image/webp" />
       <source srcSet={srcJxr} type="image/jxr" />
       <source srcSet={srcJp2} type="image/jp2" />
       <source srcSet={fallback} type="image/jpeg" />
       <img id={id} src={fallback} alt={alt} {...props} />
    </picture>
  );
};

export default ImgNextGen;