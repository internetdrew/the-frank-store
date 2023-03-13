const Footer = () => {
  return (
    <div className='py-4 text-center flex items-center gap-1 font-semibold'>
      <p>Made with love by </p>
      <a
        href='https://internetdrew.com'
        target={'_blank'}
        className='text-lg text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-red-600 motion-safe:animate-pulse'
      >
        <strong>Internet Drew</strong>
      </a>
    </div>
  );
};

export default Footer;
