import PropTypes from "prop-types";
import Image from "next/image";

const ImageComponent = ({
  src,
  alt,
  quality = 80,
  className = "",
  width = undefined,
  layout = undefined,
  height = undefined,
  onClick = undefined,
  onError = undefined,
}) => (
  <Image
    src={src}
    alt={alt}
    unoptimized
    width={width}
    height={height}
    layout={layout}
    quality={quality}
    onClick={onClick}
    onError={onError}
    className={className}
  />
);

ImageComponent.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.oneOfType([PropTypes.instanceOf(Object), PropTypes.string])
    .isRequired,
};

export default ImageComponent;
