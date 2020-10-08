import { FunctionComponent, ReactNode } from "react";
import { FaChevronDown as ChevronDown } from "react-icons/fa";

import SidebarListWrapper from "./SidebarListWrapper";
import StyledLink from "../../elements/StyledLink";
import page from "../../../i18n/page";
import { Breadcrumb } from "../../Breadcrumbs";
import SidebarBreadcrumb from "./SidebarBreadcrumb";
import { useIntl } from "react-intl";
import Placeholder from "../../elements/Placeholder";

const SidebarBreadcrumbs: FunctionComponent<{
  breadcrumbs: Breadcrumb[];
  children?: ReactNode;
}> = ({ breadcrumbs, children }) => {
  const intl = useIntl();

  return (
    <SidebarListWrapper>
      <StyledLink href="/">
        <SidebarBreadcrumb active={breadcrumbs.length === 0 && !children}>
          <div>
            <ChevronDown />
          </div>
          <div>{intl.formatMessage(page.home)}</div>
        </SidebarBreadcrumb>
      </StyledLink>
      {breadcrumbs.map((b, index) =>
        b.url === null ? (
          <SidebarBreadcrumb active={false}>
            <div>
              <ChevronDown />
            </div>
            <div>{b.name}</div>
          </SidebarBreadcrumb>
        ) : b.url && b.name ? (
          <StyledLink key={index} href={b.url}>
            <SidebarBreadcrumb active={false}>
              <div>
                <ChevronDown />
              </div>
              <div>{b.name}</div>
            </SidebarBreadcrumb>
          </StyledLink>
        ) : (
          <SidebarBreadcrumb>
            <Placeholder text inline minWidth={5} />
          </SidebarBreadcrumb>
        )
      )}
      {breadcrumbs.length > 0 && <hr />}
      {children}
    </SidebarListWrapper>
  );
};

export default SidebarBreadcrumbs;