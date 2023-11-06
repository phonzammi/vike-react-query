import { DehydratedState } from "@tanstack/react-query"
declare global {
  namespace Vike {
    interface PageContext {
      dehydratedState: DehydratedState
    }
  }

}


// Tell TypeScript this file isn't an ambient module
export { }