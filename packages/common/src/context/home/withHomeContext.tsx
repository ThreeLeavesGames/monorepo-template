import React, { ComponentType } from 'react';
import { HomeProvider } from './context';

function withHomeContext<T>(WrappedComponent: ComponentType<T>): ComponentType<T> {
  const ComponentWithHomeContext = (props: T) => {
    return (
      <HomeProvider>
        <WrappedComponent {...props} />
      </HomeProvider>
    );
  };

  return ComponentWithHomeContext;
}

export default withHomeContext;
