const Image = ({ src, alt, border }) => {
  const className = border ? 'img-bordered' : ''
  return <img src={src} alt={alt} className={className} />
}

export default Image
