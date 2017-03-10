import renderComponentsMenu from './renderComponentsMenu';
import renderArticlesMenu from './renderArticlesMenu';

export default function SideMenu(props) {
  const { data, defaultSelectedKey, type} = props;
  if (type === 'components') {
    return renderComponentsMenu(data.components, defaultSelectedKey);
  } else if(type === 'articles') {
    return renderArticlesMenu(data.articles, defaultSelectedKey);
  }
}