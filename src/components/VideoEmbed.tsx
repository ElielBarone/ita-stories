import styles from './VideoEmbed.module.css'

interface VideoEmbedProps {
  youtubeId?: string
  videoSrc?: string
  title: string
}

export function VideoEmbed({ youtubeId, videoSrc, title }: VideoEmbedProps) {
  if (videoSrc) {
    return (
      <div className={styles.localVideo}>
        <video src={videoSrc} controls playsInline title={title} />
      </div>
    )
  }

  return (
    <div className={styles.video}>
      <iframe
        src={`https://www.youtube.com/embed/${youtubeId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  )
}
