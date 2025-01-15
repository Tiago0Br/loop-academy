const LOCAL_STORAGE_KEY = '@keep-watching'

export interface IKeepWatching {
  courseId: string
  classId: string
  className: string
  courseName: string
}

export const LocalStorage = {
  keepWatching: {
    get: () => {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY)
      return data ? JSON.parse(data) : null
    },
    set: (data: IKeepWatching) => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data))
    },
    remove: () => {
      localStorage.removeItem(LOCAL_STORAGE_KEY)
    },
  },
}
