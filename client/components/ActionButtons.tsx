import {
  Button,
  Group,
  ListItem,
  Separator,
  XGroup,
  YGroup,
  YStack,
} from "tamagui";

export const ActionButtons: React.FC = () => {
  return (
    <YStack padding="$3" alignItems="center">
      <Group orientation="horizontal">
        <Group.Item>
          <Button>FOLD</Button>
        </Group.Item>
        <Group.Item>
          <Button>CHECK</Button>
        </Group.Item>
        <Group.Item>
          <Button>CALL</Button>
        </Group.Item>
        <Group.Item>
          <Button>RAIZE</Button>
        </Group.Item>
        <Group.Item>
          <Button>ALL-IN</Button>
        </Group.Item>
      </Group>
    </YStack>
  );
};
