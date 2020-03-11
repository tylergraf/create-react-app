import React from 'react'
import { Cell, Grid, Skeleton, useAtSize } from '@fs/zion-ui'

const HomePageSkeleton = () => {
  // Initiate state variables and hooks
  const atSize = useAtSize()

  return (
    <>
      <Grid>
        <Cell align="center" columns={atSize({ md: 12 })}>
          <Skeleton.Image height={250} />
        </Cell>

        <Cell columns={atSize({ md: 6 })}>
          <Skeleton.Image height="calc(var(--cell-width, 1050px) / 1.9)" />
        </Cell>

        <Cell columns={atSize({ md: 6 })}>
          <Skeleton.Image height="calc(var(--cell-width, 1050px) / 1.9)" />
        </Cell>

        <Cell columns={atSize({ md: 12 })}>
          <Skeleton.Image height={250} />
        </Cell>
      </Grid>
    </>
  )
}

export default HomePageSkeleton
