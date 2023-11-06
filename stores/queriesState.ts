import { create } from 'zustand'

type QueriesState = {
    fetchedQueries: Map<string, boolean>,
    set: (hashKey:string, isFetched:boolean) => void
}

const useQueriesState = create<QueriesState>()((set) => ({
    fetchedQueries: new Map<string,boolean>(),
    set: (hashKey:string, isFetched:boolean) => set((prev) => ({fetchedQueries: new Map(prev.fetchedQueries).set(hashKey, isFetched)}))
}))

export default useQueriesState