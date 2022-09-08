class HandlerRequests {
  #pendingRequests = {};

  constructor(promise) {
    this.promise = promise;
  }

  setRequest(url, thenCb, ...promiseParams) {
    if(url in this.#pendingRequests) {
      this.#pendingRequests[url].then(thenCb);
      return;
    }

    this.#pendingRequests[url] = this.promise(url, ...promiseParams);
    this.#pendingRequests[url].then(res => {
      delete this.#pendingRequests[url];
      thenCb(res);
    });
  }
}

export default HandlerRequests;