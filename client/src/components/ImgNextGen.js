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
       <source srcset={srcWebp} type="image/webp" />
       <source srcset={srcJxr} type="image/jxr" />
       <source srcset={srcJp2} type="image/jp2" />
       <source srcset={fallback} type="image/jpeg" />
       <img id={id} src={fallback} alt={alt} {...props} />
    </picture>
  );
};

export default ImgNextGen;