import { Link } from "react-router-dom";

const FooterLinks = () => {
  type FooterLinkProps = {
    link: string;
    text: string;
  };
  const FooterLink = (props: FooterLinkProps) => {
    const { link, text } = props;
    const isRouterLink = link.startsWith("/");

    const tailwindProps =
      "text-tornado-green transition-all hover:text-green-700";

    if (isRouterLink == true) {
      return (
        <Link className={tailwindProps} to={link}>
          {text}
        </Link>
      );
    }

    return (
      <a
        className={tailwindProps}
        href={link}
        target="_blank"
        rel="noopener noreferrer"
      >
        {text}
      </a>
    );
  };

  return (
    <div className="my-4 flex gap-3 text-center text-[#8d96a7]">
      <FooterLink link="https://github.com/ethereum-aml-tool" text="GitHub" />
      {" | "}
      <FooterLink
        link="https://vitejs.dev/guide/features.html"
        text="What is this?"
      />
      {" | "}
      <FooterLink link="/stats" text="Statistics" />
    </div>
  );
};

export default FooterLinks;
