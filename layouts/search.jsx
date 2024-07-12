import Container from '@/components/Container';
import Tags from '@/components/Tags';
import PropTypes from 'prop-types';
import BlogPostLink from '@/components/BlogPostLink';

const SearchLayout = ({ tags, posts, currentTag }) => {
  let filteredBlogPosts = [];
  if (posts) {
    filteredBlogPosts = posts.filter(post => {
      const tagContent = post.tags ? post.tags.join(' ') : '';
      const searchContent = post.title + tagContent;
      return searchContent.toLowerCase();
    });
  }

  return (
    <Container>
      <Tags tags={tags} currentTag={currentTag} />
      <div className='article-container my-8'>
        {!filteredBlogPosts.length && <p className='text-gray-500 dark:text-gray-300'>No posts found.</p>}
        {filteredBlogPosts.slice(0, 20).map(post => (
          <BlogPostLink key={post.id} post={post} />
        ))}
      </div>
    </Container>
  );
};

SearchLayout.propTypes = {
  posts: PropTypes.array.isRequired,
  tags: PropTypes.object.isRequired,
  currentTag: PropTypes.string,
};

export default SearchLayout;
