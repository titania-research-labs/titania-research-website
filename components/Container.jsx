import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useConfig } from '@/lib/config';
import Head from 'next/head';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Container = ({ children, layout, isFullWidth, ...customMeta }) => {
  const BLOG = useConfig();

  const url = BLOG.link;
  const meta = {
    title: BLOG.title,
    type: 'website',
    ...customMeta,
  };
  return (
    <div>
      <Head>
        <title>{meta.title}</title>
        {/* <meta content={BLOG.darkBackground} name="theme-color" /> */}
        <meta name='robots' content='follow, index' />
        <meta charSet='UTF-8' />
        {BLOG.seo.googleSiteVerification && (
          <meta name='google-site-verification' content={BLOG.seo.googleSiteVerification} />
        )}
        {BLOG.seo.keywords && <meta name='keywords' content={BLOG.seo.keywords.join(', ')} />}
        <meta name='description' content={meta.description} />
        <meta property='og:locale' content={'en-US'} />
        <meta property='og:title' content={meta.title} />
        <meta property='og:description' content={meta.description} />
        <meta property='og:url' content={meta.slug ? `${url}/${meta.slug}` : url} />
        <meta
          property='og:image'
          content={`${BLOG.ogImageGenerateURL}/${encodeURIComponent(
            meta.title,
          )}.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%2Fnobelium.vercel.app%2Flogo-for-dark-bg.svg`}
        />
        <meta property='og:type' content={meta.type} />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:description' content={meta.description} />
        <meta name='twitter:title' content={meta.title} />
        <meta
          name='twitter:image'
          content={`${BLOG.ogImageGenerateURL}/${encodeURIComponent(
            meta.title,
          )}.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%2Fnobelium.vercel.app%2Flogo-for-dark-bg.svg`}
        />
        {meta.type === 'article' && (
          <>
            <meta property='article:published_time' content={meta.date} />
            <meta property='article:author' content={BLOG.author} />
          </>
        )}
      </Head>
      <div className={'wrapper font-arial'}>
        <Header navBarTitle={layout === 'blog' ? meta.title : null} isFullWidth={isFullWidth} />
        <main
          className={cn(
            'flex-grow transition-all',
            layout !== 'blog' && ['self-center px-4', isFullWidth ? 'md:px-24' : 'w-full max-w-4xl'],
          )}
        >
          {children}
        </main>
        <Footer isFullWidth={isFullWidth} />
      </div>
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node,
};

export default Container;
