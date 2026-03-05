import SplitView from '../../../components/SplitView';
import MarkdownView from '../../../components/MarkdownView';
import Example from './Example';
import markdownContent from './content.md?raw';

const CssFlexboxCorePage = () => {
  return <SplitView left={<Example />} right={<MarkdownView content={markdownContent} />} />;
};

export default CssFlexboxCorePage;
