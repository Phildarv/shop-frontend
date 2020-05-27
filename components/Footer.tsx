import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Flex, Box } from "reflexbox";
import Container from "./layout/Container";
import {
  FaMapMarker as MapMarker,
  FaPhone as Phone,
  FaEnvelope as Envelope,
  FaDownload,
} from "react-icons/fa";
import { LazyImage } from "react-lazy-images";
import { defineMessages, useIntl } from "react-intl";

import { colors, media } from "../utilities/style";
import StyledLink from "./StyledLink";
import Logo from "../public/images/logo/logo_negative.svg";
import NameSlogan from "../public/images/logo/name_slogan_negative.svg";
import Placeholder from "./Placeholder";
import { pathnamesByLanguage, pageSlugsByLanguage } from "../utilities/urls";

const messages = defineMessages({
  aboutTitle: {
    id: "Footer.aboutTitle",
    defaultMessage: "Über die Hauser Feuerschutz AG",
  },
  about: {
    id: "Footer.about",
    defaultMessage:
      "Die 1970 gegründete Firma bietet Ihnen Dienstleistungen und Produkte an in den Bereichen Sicherheitskennzeichnung, Trittschutz und Feuerschutz.",
  },
  moreAbout: {
    id: "Footer.moreAbout",
    defaultMessage: "Weitere Informationen",
  },
  downloads: {
    id: "Footer.downloads",
    defaultMessage: "Downloads",
  },
});

const StyledFooter = styled.footer`
  padding: 1rem;
  border-top: ${colors.primaryContrast} 1px solid;
  background-color: ${colors.primary};
  color: ${colors.primaryContrast};
  z-index: 1;

  img {
    width: 100%;
    height: auto;

    display: block;
  }

  .logo {
    width: 50%;
  }

  .slogan {
    width: 75%;
  }

  h4 {
    margin: 0 0 0.25rem 0;
  }
`;

const BorderBox = styled(Box)`
  padding: 1rem 0;
  margin-bottom: 1rem;

  ${media.maxMedium`
    border-bottom: #fff 1px solid;
	`};

  &:last-child {
    border-bottom: none;
  }
`;

const IconList = styled.table`
  width: 100%;
  td:first-child {
    width: 15%;
    padding: 0.25rem 0;
  }
  td:last-child {
    padding-left: 1rem;
  }
`;

const Icon = styled.span`
  padding: 0.5rem;
  border: ${colors.primaryContrast} 1px solid;
  border-radius: 50%;
  display: inline-block;

  & > svg {
    display: block;
    margin: 0 auto;
  }
`;

const Footer: FunctionComponent<{}> = React.memo(({}) => {
  const intl = useIntl();

  return (
    <StyledFooter>
      <Flex>
        <Box width={[0, 0, 0, 1 / 6]} />
        <Box width={[1, 1, 1, 5 / 6]}>
          <Container>
            <Flex flexWrap="wrap">
              <BorderBox width={[1, 1, 1 / 3, 1 / 3]} px={3}>
                <LazyImage
                  src={Logo}
                  alt="Logo"
                  placeholder={({ imageProps, ref }) => (
                    <div ref={ref}>
                      <Placeholder block />
                    </div>
                  )}
                  actual={({ imageProps }) => (
                    <img {...imageProps} className="logo" />
                  )}
                />
                <br />
                <LazyImage
                  src={NameSlogan}
                  alt="Slogan"
                  placeholder={({ imageProps, ref }) => (
                    <div ref={ref}>
                      <Placeholder block />
                    </div>
                  )}
                  actual={({ imageProps }) => (
                    <img {...imageProps} className="slogan" />
                  )}
                />
              </BorderBox>
              <BorderBox width={[1, 1, 1 / 3, 1 / 3]} px={3}>
                <IconList>
                  <tbody>
                    <tr>
                      <td>
                        <Icon>
                          <MapMarker />
                        </Icon>
                      </td>
                      <td>
                        <StyledLink
                          styled
                          target="_blank"
                          external
                          href="https://www.google.ch/maps/place/Sonnmattweg+6,+5000+Aarau/@47.3971534,8.0412625,17z/data=!3m1!4b1!4m5!3m4!1s0x47903be72641ef39:0x35e802ea186c4a2d!8m2!3d47.3971534!4d8.0434512"
                          rel="noopener"
                          negative
                        >
                          Sonnmattweg 6<br />
                          CH 5000 Aarau
                        </StyledLink>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Icon>
                          <Phone />
                        </Icon>
                      </td>
                      <td>
                        <StyledLink
                          styled
                          external
                          href="tel:+41628340540"
                          negative
                        >
                          062 834 05 40
                        </StyledLink>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Icon>
                          <Envelope />
                        </Icon>
                      </td>
                      <td>
                        <StyledLink
                          styled
                          external
                          href="mailto:info@feuerschutz.ch"
                          negative
                        >
                          info@feuerschutz.ch
                        </StyledLink>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Icon>
                          <FaDownload />
                        </Icon>
                      </td>
                      <td>
                        <StyledLink
                          styled
                          href={`/${intl.locale}/${
                            pathnamesByLanguage.page.languages[intl.locale]
                          }/${
                            pageSlugsByLanguage.downloads.languages[intl.locale]
                          }`}
                          negative
                        >
                          {intl.formatMessage(messages.downloads)}
                        </StyledLink>
                      </td>
                    </tr>
                  </tbody>
                </IconList>
              </BorderBox>
              <BorderBox width={[1, 1, 1 / 3, 1 / 3]} px={3}>
                <h4>{intl.formatMessage(messages.aboutTitle)}</h4>
                {intl.formatMessage(messages.about)}{" "}
                <StyledLink
                  styled
                  href={`/${intl.locale}/${
                    pathnamesByLanguage.page.languages[intl.locale]
                  }/${pageSlugsByLanguage.companyAbout.languages[intl.locale]}`}
                  negative
                >
                  {intl.formatMessage(messages.moreAbout)}
                </StyledLink>
              </BorderBox>
            </Flex>
          </Container>
        </Box>
      </Flex>
    </StyledFooter>
  );
});

export default Footer;