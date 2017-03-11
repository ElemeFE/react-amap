import React from 'react';
import ComponentsMenu from './ComponentsMenu';
import ArticlesMenu from './ArticlesMenu';

export default function SideMenu(props) {
  const { data, defaultSelectedKey, type} = props;
  if (type === 'components') {
    return <ComponentsMenu data={data.components} defaultSelectedKey={defaultSelectedKey}/>
  } else if(type === 'articles') {
    return <ArticlesMenu data={data.articles}  defaultSelectedKey={defaultSelectedKey} />
  }
}