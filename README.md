# async-server-component

A sharable react component for re-rendering the server rendered html initially during the client render.

This prevents a flash of unstyled content during rendering a dynamically imported component render.

Taken from solutions provided in [this issue in React](https://github.com/facebook/react/issues/6985).

This component is used for two different use cases:

## Suspense on the server

Preserve the server rendered loading state when client component is dynamically imported:

```js
import AsyncServerComponent from "async-server-component";
import { asyncComponent } from "react-async-component";

const Header = asyncComponent({
  resolve: () => import(/* webpackChunkName: 'header' */ "./header"),
  LoadingComponent: () => (
    <AsyncServerComponent asyncLoading={'[data-async-loading="header"]'} />
  ),
});
```

## Server Side Treeshaking

If its possible to create a server and client version of a component, then `<AsyncServerComponent />` can prevent a component from being loaded on the client, potentially reducing bundle size.

The example below conditionally renders the more expensive logged in version, but can it can be safely excluded logged out for reduced bundle size:

```js
const ServerComponent = ({ loggedIn }) => {
  return <div>{loggedIn ? <Header /> : <LoggedoutStaticHeader />}</div>;
};

const ClientComponent = ({ loggedIn }) => {
  return (
    <div>
      {loggedIn ? (
        <Header />
      ) : (
        <AsyncServerComponent asyncLoading={'[data-async-loading="header"]'} />
      )}
    </div>
  );
};
```
