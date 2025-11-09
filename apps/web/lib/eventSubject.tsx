import { FeedEventSubject } from "@feed/types";

import CloudIcon from "@mui/icons-material/Cloud";
import CachedIcon from "@mui/icons-material/Cached";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import SettingsIcon from "@mui/icons-material/Settings";
import DnsIcon from "@mui/icons-material/Dns";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import ConstructionIcon from "@mui/icons-material/Construction";
import ExtensionIcon from "@mui/icons-material/Extension";
import AdjustIcon from "@mui/icons-material/Adjust";
import PersonIcon from "@mui/icons-material/Person";

export function eventSubjectAsText(type: FeedEventSubject): string {
  switch (type) {
    case FeedEventSubject.APPLICATION:
      return "Application";
    case FeedEventSubject.CACHE:
      return "Caching";
    case FeedEventSubject.CERTIFICATE:
      return "Certificate";
    case FeedEventSubject.CONFIG:
      return "Configuration";
    case FeedEventSubject.DNS:
      return "DNS";
    case FeedEventSubject.JOB:
      return "Task";
    case FeedEventSubject.OPTIMIZATION:
      return "Optimization";
    case FeedEventSubject.PLUG:
      return "Plugin";
    case FeedEventSubject.TARGET:
      return "Target";
    case FeedEventSubject.USER:
      return "User";
  }
}

export function eventSubjectAsIcon(subject: FeedEventSubject) {
  switch (subject) {
    case FeedEventSubject.APPLICATION:
      return <CloudIcon />;
    case FeedEventSubject.CACHE:
      return <CachedIcon />;
    case FeedEventSubject.CERTIFICATE:
      return <WorkspacePremiumIcon />;
    case FeedEventSubject.CONFIG:
      return <SettingsIcon />;
    case FeedEventSubject.DNS:
      return <DnsIcon />;
    case FeedEventSubject.JOB:
      return <FormatListNumberedIcon />;
    case FeedEventSubject.OPTIMIZATION:
      return <ConstructionIcon />;
    case FeedEventSubject.PLUG:
      return <ExtensionIcon />;
    case FeedEventSubject.TARGET:
      return <AdjustIcon />;
    case FeedEventSubject.USER:
      return <PersonIcon />;
  }
}
