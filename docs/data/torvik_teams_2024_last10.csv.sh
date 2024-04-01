#!/usr/bin/env bash
# print the header, since torvik doesn't include a header
printf "name,adjoe,adjde,barthag,record,unknown,games,efg,efgd,ftr,ftrd,to_rate,to_rate_d,orb,orb_d,unknown,two_pt_pct,two_pt_pct_d,three_pt_pct,three_pt_pct_d,block_pct_d,block_pct,ast_rate,ast_rate_d,three_pt_rate,three_pt_rate_d,adj_tempo,unknown,unknown,unknown,season,unknown,unknown,unknown,wab,ft_pct,ft_pct_d\n"
# download the csv and strip the first line, since the file includes a first,
# empty, line
curl 'https://barttorvik.com/?year=2024&csv=1&lastx=10' | tail -n +2
