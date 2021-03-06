import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Badge,
  Box,
  Grid,
  Heading,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Tooltip,
} from '@chakra-ui/core';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdRemoveCircleOutline } from 'react-icons/md';
import { selectBasicShowInfoForAllShows } from 'store/tv/selectors';
import { removeFromFollowedShowsAction } from 'store/user/actions';
import { fallbackImage } from 'utils/constants';
import { maybePluralize } from 'utils/formatting';
import { BasicShowInfo } from 'types/external';

const FollowedShow = ({ show }: { show: BasicShowInfo }) => {
  const dispatch = useDispatch();
  const { id: showId, name, network, numEpisodes, numSeasons, posterPath, status } = show;
  const posterSource = posterPath && `https://image.tmdb.org/t/p/w185${posterPath}`;

  const onUnfollowShow = () => {
    dispatch(removeFromFollowedShowsAction(showId));
  };

  const statusColorMap = {
    Ended: 'red',
    Returning: 'purple',
    'New Episodes': 'green',
  };

  return (
    <Grid borderWidth="1px" gap="19px" key={show.id} p={4} shadow="md" templateColumns="1fr 2.65fr">
      <Tooltip aria-label={name} label={name} placement="top" hasArrow>
        <Image borderRadius="6px" fallbackSrc={fallbackImage} src={posterSource} />
      </Tooltip>

      <Box minWidth="0">
        <Box display="flex" justifyContent="space-between">
          <Heading as="h4" fontSize="lg" mb="6px" textAlign="center" isTruncated>
            {name}
          </Heading>

          <Menu>
            <MenuButton>
              <Box as={BsThreeDotsVertical} size="19px" />
            </MenuButton>
            <MenuList placement="bottom-end">
              <MenuItem onClick={onUnfollowShow}>
                <Box as={MdRemoveCircleOutline} mr="8px" size="19px" />
                Unfollow
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>

        <Badge>{network?.name}</Badge>

        <Text fontSize="sm">
          {numSeasons} {maybePluralize(numSeasons, 'season')}
        </Text>
        <Text fontSize="sm">
          {numEpisodes} {maybePluralize(numEpisodes, 'episode')}
        </Text>

        <Badge variant="outline" variantColor={statusColorMap[status]}>
          {status}
        </Badge>
      </Box>
    </Grid>
  );
};

const AllFollowedShows = () => {
  const allShows = useSelector(selectBasicShowInfoForAllShows);

  return (
    <Box mb="25px" mt="55px" p="0 10px">
      <Heading as="h2" fontSize="xl" mb="18px" textAlign="center">
        Following
      </Heading>

      {allShows.length ? (
        <Grid
          justifyContent="center"
          gap={6}
          templateColumns={{ base: 'repeat(auto-fill, 300px)', md: 'repeat(auto-fill, 400px)' }}
        >
          {allShows.map(show => (
            <FollowedShow key={show.id} show={show} />
          ))}
        </Grid>
      ) : (
        <Box>
          <Text fontSize="sm" textAlign="center">
            Start following your favorite shows to track them here!
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default AllFollowedShows;
