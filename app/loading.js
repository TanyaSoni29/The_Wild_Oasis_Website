export default function Loading() {
  return <p>LOADING DATA...</p>;
}

// only defining this loader here next js automatically show this indicator when any page fetching the data actually  data on the server is start streaming it is not going in one go on the client side it is streamed (means send in pieces not as whole) next js use "renderToReadableStream" it is not called "renderToString" that we learn in fundamental of react next js this is part of dom methods and streaming only work when you alow your browser for javascript enable not javascript disable

// we can also add streaming individually using Suspense on individual component currently when we haven't streaming for individual page then it is streaming for all global layout weather it is nested to much means there is 20 components and only fetching one still it will stream globally means whole page will be replace with loading page initially

// this loading page doing this streaming part

// to make folder private it will not come as routing in next js we use underscore
