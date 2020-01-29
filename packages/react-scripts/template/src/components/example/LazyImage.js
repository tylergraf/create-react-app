import React from 'react'

const defaultPlaceHolder =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII='

const LazyImage = ({ src, alt, placeholder = defaultPlaceHolder, handleOnError, handleOnLoad, className }) => {
  const [imageSrc, setImageSrc] = React.useState(placeholder)
  const [imageRef, setImageRef] = React.useState()

  const onLoad = (event) => {
    if (event.target.src !== placeholder) event.target.classList.add('loaded')
    handleOnLoad && handleOnLoad(event)
  }

  const onError = (event) => {
    event.target.classList.add('has-error')
    handleOnError && handleOnError(event)
  }

  React.useEffect(() => {
    let observer
    let didCancel = false

    if (imageRef && imageSrc === placeholder) {
      if (IntersectionObserver) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              // when image is visible in the viewport + rootMargin
              if (!didCancel && (entry.intersectionRatio > 0 || entry.isIntersecting)) {
                setImageSrc(src)
              }
            })
          },
          {
            threshold: 0.01,
            rootMargin: '75%',
          }
        )
        observer.observe(imageRef)
      } else {
        // Old browsers fallback
        setImageSrc(src)
      }
    }
    return () => {
      didCancel = true
      if (observer && observer.unobserve) {
        observer.unobserve(imageRef)
      }
    }
  }, [imageRef, imageSrc, placeholder, src])

  return <img className={className} ref={setImageRef} src={imageSrc} alt={alt} onLoad={onLoad} onError={onError} />
}

export default LazyImage
