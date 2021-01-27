import React, { useState } from 'react';
import { FlatList, TouchableOpacity, Picker  } from 'react-native';
import { RepositoryItemCore } from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useHistory } from 'react-router-native';
import { useDebounce } from 'use-debounce';
import { Searchbar } from 'react-native-paper';
import ItemSeparator from './ItemSeparator';

const RepositoryList = ({ ...props }) => {
  const [direction, setDirection] = useState('DESC');
  const [order, setOrder] = useState('CREATED_AT');
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);

  const { repositories, fetchMore } = useRepositories(
    order, direction, debouncedSearch, 3);

  const onEndReach = () => {
    fetchMore();
  };

  return <RepositoryListContainer 
      repositories={ repositories } 
      setOrder={ setOrder }
      setDirection={ setDirection }
      setSearch={ setSearch }
      onEndReach={ onEndReach }
      { ...props } />;
};

const RepoListHeader = ({ setOrder, setDirection, setSearch }) => {
  return (
    <>
      <SearchBar setSearch={ setSearch } />
      <Dropdown setOrder={ setOrder } setDirection={ setDirection } />
    </>
  );
};

const SearchBar = ({ setSearch }) => {
  const [searchBarValue, setSerachBarValue] = useState('');

  const onChange = (value) => {
    setSerachBarValue(value);
    setSearch(value);
  };

  return (
    <Searchbar 
      placeholder="Search" 
      onChangeText={ onChange }
      value={ searchBarValue }
    />
  );
};

const Dropdown = ({ setOrder, setDirection }) => {
  const [selected, setSelected] = useState('latest');

  const lookupTable = {
    'latest': { order: 'CREATED_AT', direction: 'DESC' },
    'highest': { order: 'RATING_AVERAGE', direction: 'DESC' },
    'lowest': { order: 'RATING_AVERAGE', direction: 'ASC' }
  };

  const onChange = (value) => {
    const { order, direction } = lookupTable[value];
    setDirection(direction);
    setOrder(order);
    setSelected(value);
  };

  return (
      <Picker
        selectedValue={ selected }
        onValueChange={ (value) => onChange(value) }
      >
        <Picker.Item label="Latest Repositories" value="latest" />
        <Picker.Item label="Highest Rated Repositories" value="highest" />
        <Picker.Item label="Lowest Rated Repositories" value="lowest" />
      </Picker>
  );
};

export const RepositoryListContainer = (
  { repositories, setSearch, setOrder, setDirection, onEndReach }) => {
  const history = useHistory();
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  const renderItemFunc = ({ item }) => {
    return (
      <TouchableOpacity onPress={ () => history.push('/repo/' + item.fullName )}>
        <RepositoryItemCore
          itemImage={ item.ownerAvatarUrl }
          itemTitle={ item.fullName } 
          itemDescription={ item.description }
          itemLanguage={ item.language }
          itemStars={ item.stargazersCount }
          itemForks={ item.forksCount }
          itemReviews={ item.reviewCount }
          itemRating={ item.ratingAverage }
      />
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={ repositoryNodes }
      ItemSeparatorComponent={ ItemSeparator }
      keyExtractor={ x => x.id }
      renderItem={ renderItemFunc }
      ListHeaderComponent={ 
        <RepoListHeader
          setSearch={ setSearch } 
          setOrder={ setOrder } 
          setDirection={ setDirection } /> 
      }
      onEndReached={ onEndReach }
      onEndReachedThreshold={ 0.5 }
    />
  );
};

export default RepositoryList;