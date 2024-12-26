import { youtube } from '@googleapis/youtube'

const YoutubeApiClient = youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY,
})

export const APIYoutube = {
  course: {
    getAll: async () => {
      const { data } = await YoutubeApiClient.playlists.list({
        maxResults: 50,
        part: ['snippet'],
        channelId: process.env.YOUTUBE_CHANNEL_ID,
      })

      const courses =
        data.items?.map((item) => {
          const { id, snippet } = item

          return {
            id: id ?? '',
            title: snippet?.title ?? '',
            description: snippet?.description ?? '',
            thumbnail: snippet?.thumbnails?.high?.url ?? '',
          }
        }) ?? []

      return courses.filter((course) => course.description.includes('#CODARSE'))
    },
  },
}
