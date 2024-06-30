namespace api.Models
{
    public class FakeContext
    {
        public decimal Balance => 0;
        public List<Route> Routes => new()
        {
            new()
            {
                Name = "Отсюда и до фонтана",
                Description = "Краткое описание",
                Id = 1,
                Cost = 10,
                CheckPoints = new List<CheckPoint>
                {
                    new() {
                        Name = "Памятник 1",
                        Description = "Описание памятника 1",
                    },
                    new()
                    {
                        Name = "Парк 1",
                        Description = "Описание парка 1",
                    },
                    new() {
                        Name = "Площадь1",
                        Description = "Описание площади 1",
                    },
                    new() {
                        Name = "Фонтан 1",
                        Description = "Описание фонтана 1",
                    },
                }
            },
            new()
            {
                Name = "От фонтана до моста",
                Description = "Краткое описание",
                Id = 2,
                Cost = 15,
                CheckPoints = new List<CheckPoint>
                {
                    new() {
                        Name = "Памятник 2",
                        Description = "Описание памятника 2",
                    },
                    new()
                    {
                        Name = "Парк 2",
                        Description = "Описание парка 2",
                    },
                    new() {
                        Name = "Площадь 2",
                        Description = "Описание площади 2",
                    },
                    new() {
                        Name = "Фонтан 2",
                        Description = "Описание фонтана 2",
                    },
                }
            },
            new()
            {
                Name = "От Петроградки до Можайкиа",
                Description = "Краткое описание",
                Id = 3,
                Cost = 20,
                CheckPoints = new List<CheckPoint>
                {
                    new() {
                        Name = "Памятник 2",
                        Description = "Описание памятника 2",
                    },
                    new()
                    {
                        Name = "Парк 2",
                        Description = "Описание парка 2",
                    },
                    new() {
                        Name = "Площадь 2",
                        Description = "Описание площади 2",
                    },
                    new() {
                        Name = "Фонтан 2",
                        Description = "Описание фонтана 2",
                    },
                }
            }
        };
        public List<UserRoute> UserRoutes => new()
        {
            new()
            {
                Name = "Отсюда и до фонтана",
                Description = "Краткое описание",
                Id = 1,
                Complete = false,
                UserCheckPoints = new List<UserCheckPoint>
                {
                    new() {
                        Name = "Памятник 1",
                        Description = "Описание памятника 1",
                        Passed = true,
                    },
                    new()
                    {
                        Name = "Парк 1",
                        Description = "Описание парка 1",
                        Passed = true,
                    },
                    new() {
                        Name = "Площадь 1",
                        Description = "Описание площади 1",
                        Passed = false,
                    },
                    new() {
                        Name = "Фонтан 1",
                        Description = "Описание фонтана 1",
                        Passed = false,
                    },
                }
            },
            new()
            {
                Name = "От фонтана до моста",
                Description = "Краткое описание",
                Id = 2,
                Complete = false,
                UserCheckPoints = new List<UserCheckPoint>
                {
                    new() {
                        Name = "Памятник 2",
                        Description = "Описание памятника 2",
                        Passed = false,
                    },
                    new()
                    {
                        Name = "Парк 2",
                        Description = "Описание парка 2",
                        Passed = false,
                    },
                    new() {
                        Name = "Площадь 2",
                        Description = "Описание площади 2",
                        Passed = false,
                    },
                    new() {
                        Name = "Фонтан 2",
                        Description = "Описание фонтана 2",
                        Passed = false,
                    },
                }
            },
            new()
            {
                Name = "От Петроградки до Можайкиа",
                Description = "Краткое описание",
                Id = 3,
                Complete = false,
                UserCheckPoints = new List<UserCheckPoint>
                {
                    new() {
                        Name = "Памятник 3",
                        Description = "Описание памятника 3",
                        Passed = false,
                    },
                    new()
                    {
                        Name = "Парк 3",
                        Description = "Описание парка 3",
                        Passed = false,
                    },
                    new() {
                        Name = "Площадь 3",
                        Description = "Описание площади 3",
                        Passed = false,
                    },
                    new() {
                        Name = "Фонтан 3",
                        Description = "Описание фонтана 3",
                        Passed = false,
                    },
                }
            }
        };
    }
}
