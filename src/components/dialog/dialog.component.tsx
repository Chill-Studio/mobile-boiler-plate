import { Button, AlertDialog, Text } from "native-base";
import { useRef } from "react";
export function Dialog(p: {
  isOpen: boolean;
  title: string;
  content: JSX.Element;
  confirmBtnText?: string;
  onClose?: () => void;
  onConfirm?: () => void;
  rightIcon?: JSX.Element;
  isBtnDisabled?: boolean;
  closeOnOverlayClick?: boolean;
}) {
  const cancelRef = useRef(null);
  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={p.isOpen}
      onClose={p.onClose}
      closeOnOverlayClick={p.closeOnOverlayClick}
    >
      <AlertDialog.Content>
        <AlertDialog.Header>
          <Text fontSize="xl">{p.title}</Text>
        </AlertDialog.Header>
        <AlertDialog.Body>{p.content}</AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button
              isDisabled={p.isBtnDisabled}
              bg="teal.400"
              onPress={!p.isBtnDisabled ? p.onConfirm : undefined}
              _text={{ fontSize: "xl" }}
              rightIcon={p.rightIcon}
            >
              {p.confirmBtnText}
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
}
