import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import useParagonAuth from "../hooks/useParagonAuth";
import useParagonGlobal from "../hooks/useParagonGlobal";
import { ConnectUser } from "../paragon";

type Props = {
  integrationType: string | null;
  onClose: () => void;
};

type ConnectButtonProps = {
  integrationType: string | null;
  user?: ConnectUser;
}

function ConnectButton({ integrationType, user }: ConnectButtonProps) {
  if (!user?.authenticated || !integrationType) {
    return null;
  }
  if (!user.integrations[integrationType]?.enabled) {
    return (
      <Button
        variant="contained"
        onClick={() => paragon.installIntegration(integrationType)}
      >
        Connect
      </Button>
    );
  } else {
    return (
      <Button onClick={() => paragon.uninstallIntegration(integrationType)}>
        Disconnect
      </Button>
    );
  }
}

function IntegrationDetailView({ integrationType, onClose }: Props) {
  const paragon = useParagonGlobal();
  const { user } = useParagonAuth(paragon);

  if (!paragon) {
    return null;
  }

  const integration = integrationType
    ? paragon.getIntegrationMetadata(integrationType)
    : { name: "", icon: "" };

  return (
    <Dialog open={integrationType !== null} onClose={onClose}>
      {integrationType ? (
        <>
          <DialogTitle
            fontWeight={700}
            fontSize={24}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <div>
              <img
                src={integration.icon}
                width={24}
                style={{ marginRight: "16px" }}
              />
              {integration.name}
            </div>
            <ConnectButton user={user} integrationType={integrationType} />
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              This is a description of the {integration.name} integration. You
              can customize this text is in your source code.
            </DialogContentText>
          </DialogContent>
        </>
      ) : null}
    </Dialog>
  );
}

export default IntegrationDetailView;
