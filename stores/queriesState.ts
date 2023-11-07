import { create } from 'zustand'

type QueriesState = {
    // A query present in this map means that we have started fetching it. If the value is true,
    // it means that we have even finished fetching it.
    knownQueries: Map<string, boolean>,
    set: (hashKey:string, isFetched:boolean) => void
}

const useQueriesState = create<QueriesState>()((set) => ({
    knownQueries: new Map<string,boolean>(),
    set: (hashKey:string, isFetched:boolean) => set((prev) => ({knownQueries: new Map(prev.knownQueries).set(hashKey, isFetched)}))
}))

export default useQueriesState