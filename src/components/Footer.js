import React from "react";

const Footer = ({
  technoLink,
  technoName,
  companyLink,
  companyName,
  authorLink,
  authorName,
}) => {
  return (
    <>
      <p>
        Made with{" "}
        <span>
          <a href={technoLink} target="blank">
            {technoName}
          </a>
        </span>{" "}
        in{" "}
        <span>
          <a href={companyLink} target="blank">
            {companyName}
          </a>
        </span>{" "}
        by{" "}
        <span>
          <a href={authorLink} target="blank">
            {authorName}
          </a>
        </span>
      </p>
    </>
  );
};

export default Footer;
