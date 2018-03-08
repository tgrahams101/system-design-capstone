# Project Overview

> A back-end simulation of a Netflix API endpoint (get movies by list of movie_ids)

## Optimizations Used in this simulation

- Database Indexing

- Adding a Redis cache atop Postgres database

- Integrating clustering on server that uses round-robin load balancing to distribute requests among server instances

## Tools & Technologies used

- Node.js
- Express
- Postgresql
- Redis cache
- Amazon Web Services
- Artillery.io (For load testing)
- New Relic (for performance monitoring)


## Metrics Reached through optimizations

### On Local Machine
======

#### Base-line

```sh
900 RPS
7900 MS latency
```

#### After Indexing

```sh
910 RPS
7900 MS latency
```

#### After Indexing, Adding Redis cache

```sh
1600 RPS
2000 MS latency
```

#### After Indexing, Adding Redis cache, and server clustering

```sh
1400 RPS
300 MS latency
```

### On Amazon Web Services EC2 Machine
======

#### Base-line

```sh
590 RPS
13700 MS latency
```

#### After Indexing

```sh
590 RPS
13700 MS latency
```

#### After Indexing, Adding Redis cache

```sh
900 RPS
6000 MS latency
```

#### After Indexing, Adding Redis cache, and server clustering (since my configuration of clustering replicates additional server based on number of CPU cores, as AWS EC2 has only one CPU core, no additional server instances were replicated)

```sh
900 RPS
6500 MS latency
```
