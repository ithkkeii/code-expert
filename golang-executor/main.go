package main

import (
	"context"
	"fmt"
	"time"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/client"
)

func UNUSED(x ...interface{}) {}

func createContainer(ctx context.Context) {

}

func main() {
	ctx := context.Background()
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		panic(err)
	}

	start := time.Now()
	res, err := cli.ContainerCreate(ctx,
		&container.Config{
			Image: "node:16-alpine",
			Cmd:   []string{"echo", "hello world"},
		},
		&container.HostConfig{
			AutoRemove: true,
		},
		nil, nil, "")
	if err != nil {
		panic(err)
	}
	fmt.Printf("create container took %s \n", time.Since(start))

	if err := cli.ContainerStart(ctx, res.ID, types.ContainerStartOptions{}); err != nil {
		panic(err)
	}
	fmt.Printf("start container took %s \n", time.Since(start))

	fmt.Println(res)
}
