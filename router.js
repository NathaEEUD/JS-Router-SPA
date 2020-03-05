class Router {
  constructor(routes) {
    this.routes = routes;
    this._loadInitialRoutes();
  }

  _matchUrlToRoute(urlSegs) {
    const matchedRoute = this.routes.find(route => {
      const routePathSegs = route.path.split('/').slice(1);
      if (routePathSegs.length !== urlSegs.length) {
        return false;
      }

      return routePathSegs.every((routePathSeg, i) => routePathSeg === urlSegs[i]);
    });

    return matchedRoute;
  }

  loadRoute(...urlSegs) {
    const matchedRoute = this._matchUrlToRoute(urlSegs);
    const url = `/${urlSegs.join('/')}`;
    history.pushState({}, 'Works!', url);
    const routerOutEl = document.querySelectorAll('[data-router]')[0];
    routerOutEl.innerHTML = matchedRoute.template;
  }

  _loadInitialRoutes() {
    const pathNameSplit = window.location.pathname.split('/');
    console.log('_loadInitialRoutes pathNameSplit:::: ', pathNameSplit);
    const pathSegs = pathNameSplit.length > 1 ? pathNameSplit.slice(1) : '';
    console.log('_loadInitialRoutes pathSegs:::: ', pathSegs);
    this.loadRoute(...pathSegs);
  }
}