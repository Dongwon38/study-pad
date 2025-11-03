import SplitView from '../../../components/SplitView';
import MarkdownView from '../../../components/MarkdownView';
import Example from './Example';
import markdownContent from './content.md';

const CssSelectorsPage = () => {
  return <SplitView left={<Example />} right={<MarkdownView content={markdownContent} />} />;
};

export default CssSelectorsPage;
