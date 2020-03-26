import React from 'react'
import { Cell, Grid, Skeleton, useAtSize } from '@fs/zion-ui'

const HomePageSkeleton = () => {
  // Initiate state variables and hooks
  const atSize = useAtSize()

  return (
    <>
      <Grid>
        <Cell verticalAlign="middle" columns={atSize({ lg: 12 })}>
          <Skeleton.Image height={250} />
        </Cell>

        <Cell columns={atSize({ lg: 6 })}>
          <Skeleton.Image height="calc(var(--cell-width, 750px) / 2.5)" />
        </Cell>

        <Cell columns={atSize({ lg: 6 })}>
          <Skeleton.Image height="calc(var(--cell-width, 750px) / 2.5)" />
        </Cell>

        <Cell columns={atSize({ lg: 12 })}>
          <Skeleton.Image height={250} />
        </Cell>
      </Grid>
    </>
  )
}

export default HomePageSkeleton
