import { Button, Header, Icon, Modal } from "semantic-ui-react";
type Props = {
  retry: () => void;
};
export default function ErrorModal({ retry }: Props) {
  return (
    <Modal basic open={true} size="small">
      <Header icon>
        <Icon name="archive" color="red"/>
        Error Loading Posts
      </Header>
      <Modal.Content>
        <p>
          OOPS! Something went wrong. Try Loading Posts again. If it persists,
          Check your internet Connection
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" inverted onClick={() => retry()}>
          <Icon name="checkmark" /> Try Again
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
