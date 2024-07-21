import Container from '@/components/Container';
import Category from '@/components/Category';
import PropTypes from 'prop-types';
import BlogPostLink from '@/components/BlogPostLink';

const CategoryLayout = ({ allCategories, posts, currentCategory }) => {
  let filteredBlogPosts = [];
  if (posts) {
    filteredBlogPosts = posts.filter(post => {
      return (post.title + post.category).toLowerCase();
    });
  }

  return (
    <Container>
      <Category allCategories={allCategories} currentCategory={currentCategory} />
      <div className='article-container my-8'>
        {!filteredBlogPosts.length && <p className='text-gray-500 dark:text-gray-300'>No posts found.</p>}
        {filteredBlogPosts.slice(0, 20).map(post => (
          <BlogPostLink key={post.id} post={post} />
        ))}
      </div>
    </Container>
  );
};

CategoryLayout.propTypes = {
  posts: PropTypes.array.isRequired,
  allCategories: PropTypes.object.isRequired,
  currentCategory: PropTypes.string,
};

export default CategoryLayout;
