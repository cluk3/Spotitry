export const uniq = (a) => {
  var seen = {}
  return a.filter((item) => {
    return seen.hasOwnProperty(item.name) ? false : (seen[item.name] = true)
  })
}

export const selectImageUrl = (images, filter) => {
  const filteredImgs = images
  .filter(filter)
  const image = filteredImgs[filteredImgs.length - 1]
  return image && image.url
}

export const artistsFromRes = (res) => {
  return res.items
    .sort((a, b) => b.followers.total - a.followers.total)
    .map((artist) => {
      return {
        name: artist.name,
        followers: artist.followers.total,
        genres: artist.genres,
        images: artist.images,
        imageUrl: selectImageUrl(artist.images, image => image.width >= 200 && image.height >= 200),
        popularity: artist.popularity,
        id: artist.id
      }
    })
}

export const albumsFromRes = (res) => {
  return uniq(res.items)
  .map(album => ({
    name: album.name,
    href: album.href,
    id: album.id,
    images: album.images,
    imageUrl: selectImageUrl(album.images, image => image.width >= 300),
    type: album.type
  }))
}

export const formatSongDuration = (durationMs) => {
  const duration = durationMs / 1000
  const minutes = Math.floor(parseInt(duration) / 60)
  const seconds = (parseInt(duration) % 60)
  return minutes + ':' + (seconds < 10 ? '0' + seconds : seconds)
}
