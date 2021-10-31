import { Heading } from "@chakra-ui/react";
import { MoonIcon } from "@chakra-ui/icons";
import { Box, Flex } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/color-mode";

const Header = () => {
  const { toggleColorMode } = useColorMode();
  return (
    <Flex
      height={[12, 16, 24]}
      boxShadow="sm"
      justifyContent="space-between"
      alignItems="center"
      px={[4, 8, 16]}
    >
      <Heading as="h1" fontSize={["xl", "2xl", "3xl", "4xl"]} color="gray.500">
        {" "}
        &#123; Next Countries &#125;{" "}
      </Heading>
      <IconButton
        aria-label="Change Color Mode"
        icon={<MoonIcon />}
        onClick={toggleColorMode}
      />
    </Flex>
  );
};

export default Header;
