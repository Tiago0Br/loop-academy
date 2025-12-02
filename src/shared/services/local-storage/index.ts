const KEEP_WATCHING_LOCAL_STORAGE_KEY = '@keep-watching'
const WATCHED_CONTENT_LOCAL_STORAGE_KEY = '@watched-content'

export interface IKeepWatching {
  courseId: string
  classId: string
  className: string
  courseName: string
}

export const LocalStorage = {
  keepWatching: {
    get: () => {
      const data = localStorage.getItem(KEEP_WATCHING_LOCAL_STORAGE_KEY)
      return data ? JSON.parse(data) : null
    },
    set: (data: IKeepWatching) => {
      localStorage.setItem(
        KEEP_WATCHING_LOCAL_STORAGE_KEY,
        JSON.stringify(data)
      )
    },
    remove: () => {
      localStorage.removeItem(KEEP_WATCHING_LOCAL_STORAGE_KEY)
    }
  },
  watchedContent: {
    get: (courseId: string): string[] | null => {
      const data = localStorage.getItem(WATCHED_CONTENT_LOCAL_STORAGE_KEY)

      if (!data) return null

      const watchedContent = JSON.parse(data) as Record<string, string[]>

      return watchedContent[courseId] ?? null
    },
    toggle: (
      courseId: string,
      classId: string,
      forceState?: 'add' | 'remove'
    ) => {
      let watchedContent: Record<string, string[]> = {}

      const data = localStorage.getItem(WATCHED_CONTENT_LOCAL_STORAGE_KEY)
      if (data) {
        watchedContent = JSON.parse(data)
      }

      if (!watchedContent[courseId]) {
        watchedContent[courseId] = []
      }

      if (forceState) {
        if (forceState === 'add') {
          if (!watchedContent[courseId].includes(classId)) {
            watchedContent[courseId].push(classId)
          }
        } else {
          watchedContent[courseId] = watchedContent[courseId].filter(
            (id) => id !== classId
          )
        }
      } else {
        if (watchedContent[courseId].includes(classId)) {
          watchedContent[courseId] = watchedContent[courseId].filter(
            (id) => id !== classId
          )
        } else {
          watchedContent[courseId].push(classId)
        }
      }

      localStorage.setItem(
        WATCHED_CONTENT_LOCAL_STORAGE_KEY,
        JSON.stringify(watchedContent)
      )

      return watchedContent[courseId] ?? null
    }
  }
}
