import styles from './VideoEmbed.module.css'

interface VideoEmbedProps {
  youtubeId: string
  title: string
}

export function VideoEmbed({ youtubeId, title }: VideoEmbedProps) {
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
