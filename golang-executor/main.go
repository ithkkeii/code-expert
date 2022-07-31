package main

import (
	"context"
	"fmt"
	"os"
	"time"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/client"
	"github.com/docker/docker/pkg/stdcopy"
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

	timingCreateContainer := time.Now()
	res, err := cli.ContainerCreate(ctx,
		&container.Config{
			Image: "node:16-alpine",
			Cmd:   []string{"echo", "hello world"},
		},
		&container.HostConfig{
			Resources: container.Resources{
				CPUPeriod: 100000,
				CPUQuota:  2000,
			},
			AutoRemove: true,
		},
		nil, nil, "")
	if err != nil {
		panic(err)
	}
	fmt.Printf("create container took %s \n", time.Since(timingCreateContainer))

	timingStartContainer := time.Now()
	if err := cli.ContainerStart(ctx, res.ID, types.ContainerStartOptions{}); err != nil {
		panic(err)
	}
	fmt.Printf("start container took %s \n", time.Since(timingStartContainer))

	fmt.Println(res)
	statusCh, errCh := cli.ContainerWait(ctx, res.ID, container.WaitConditionNotRunning)
	select {
	case err := <-errCh:
		if err != nil {
			panic(err)
		}
	case <-statusCh:
	}

	out, err := cli.ContainerLogs(ctx, res.ID, types.ContainerLogsOptions{ShowStdout: true})
	if err != nil {
		panic(err)
	}

	stdcopy.StdCopy(os.Stdout, os.Stderr, out)
}
