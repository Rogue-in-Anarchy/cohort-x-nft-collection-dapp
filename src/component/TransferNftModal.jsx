import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import useHandleTransfer from "../hooks/useHandleTransfer";
import app from "../App";

const TransferNftModal = () => {
  const [address, setAddress] = useState("");
  console.log(address);

  //   const [edition, setEdition] = useState("");

  const handleTransfer = useHandleTransfer(address, app.edition);

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button className="bg-blue-600">Add New Owner</Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Edit profile</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Transfer Ownership
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              New Owner&apos;s Address
            </Text>
            <TextField.Input
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                console.log(address);
              }}
              placeholder="Enter New Owner's Address"
            />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Button className="bg-blue-600" onClick={() => handleTransfer()}>
            Transfer to New Owner
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default TransferNftModal;
